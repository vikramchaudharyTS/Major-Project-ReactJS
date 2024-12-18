import React from "react";

const FollowersUnfollowers = () => {
  return (
    <div className="bg-zinc-800 text-zinc-900 rounded-md w-[100%]">
      <div className="mx-auto p-4 ">
        <div className="flex flex-col md:flex-row gap-5 ">
          {/* Followers Section */}
          <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Followers</h2>
            <div className="space-y-4">
              {/* Follower Item */}
              <div className="flex items-center">
                <img
                  alt="Follower profile picture"
                  className="w-10 h-10 rounded-full"
                  height="40"
                  src="https://storage.googleapis.com/a1aa/image/7f9HjfDqeCNBlI8YrxwmcCISaTQqmfOTp0GsiTx3r02TaSwPB.jpg"
                  width="40"
                />
                <div className="ml-3">
                  <p className="font-semibold">Follower 1</p>
                </div>
                <button className="ml-auto bg-red-500 text-white px-3 py-1 rounded">
                  Unfollow
                </button>
              </div>

              {/* Add more followers as needed */}
            </div>
          </div>

          {/* Following Section */}
          <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Following</h2>
            <div className="space-y-4">
              {/* Following Item */}
              <div className="flex items-center">
                <img
                  alt="Following profile picture"
                  className="w-10 h-10 rounded-full"
                  height="40"
                  src="https://storage.googleapis.com/a1aa/image/zQfusbAbLh3NRC0pfISDSAerh6rcDKoigreifUxgEJeTpJBfJA.jpg"
                  width="40"
                />
                <div className="ml-3">
                  <p className="font-semibold">Following 1</p>
                </div>
                <button className="ml-auto bg-red-500 text-white px-3 py-1 rounded">
                  Unfollow
                </button>
              </div>

              {/* Add more following as needed */}
            </div>
          </div>

          {/* Friends Section */}
          <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Friends</h2>
            <div className="space-y-4">
              {/* Friend Item */}
              <div className="flex items-center">
                <img
                  alt="Friend profile picture"
                  className="w-10 h-10 rounded-full"
                  height="40"
                  src="https://storage.googleapis.com/a1aa/image/LbPFwlOXfequqEUemo2IQK3wSynIYFUqOiyrE89f8ZRZaSwPB.jpg"
                  width="40"
                />
                <div className="ml-3">
                  <p className="font-semibold">Friend 1</p>
                </div>
                <button className="ml-auto bg-red-500 text-white px-3 py-1 rounded">
                  Unfollow
                </button>
              </div>

              {/* Add more friends as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowersUnfollowers;
