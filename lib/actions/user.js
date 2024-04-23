import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mogoose";

export const CreateOrUpdate = async ({
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username,
}) => {
  try {
    await connectToDB();
    const user = await User.findByIdAndUpdate(
      { clerkId: id },
      {
        $set: {
          clerkId: id,
          firstname: first_name,
          lastname: last_name,
          username: username,
          email: email_addresses[0].email_address,
        },
      },
      { upsert: true, new: true }
    );
    await user.save();
  } catch (e) {
    console.log(e);
  }
};

export const deleteuser = async (id) => {
  try {
    await connectToDB();
    await User.findOneAndDelete({ clerkId: id });
  } catch (err) {
    console.log(err);
  }
};
