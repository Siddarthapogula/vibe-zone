import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { CreateOrUpdate, deleteuser } from '@lib/actions/user'
 
export async function POST(req) {
 
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
 
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }
 
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
 
  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }
 
  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);
 
  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);
 
  let evt
 
  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    })
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  //handle to event

  const eventType = evt?.type

  if(eventType === 'user.created'|| eventType === 'email.created'|| eventType === 'user.up'){
    const {  id,
      first_name,
      last_name,
      image_url,
      email_addresses,
      username} = evt.data;

    try{
      await CreateOrUpdate(id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username);
        
        return new Response('', {status : 200});
    }
    catch(e){
      console.log("error while creating or updating user : ", e);
      return new Response ("error occured", {
        status : 404
      })
    }
  }

  if(eventType == 'user.deleted'){
    try{
      const {id} = evt?.data;
      await deleteuser(id);
      return new Response("user is deleted", {status : 200});
    }catch(e){
      return new Response ("error while deleting the user ", {status : 404});
    }
  }



 
  return new Response('', { status: 200 })
}
 