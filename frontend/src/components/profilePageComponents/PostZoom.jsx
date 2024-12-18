import React from 'react';

const PostZoom = () => {
    return (
        <div className="bg-black text-white">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row">
                {/* Post Image */}
                <div className="md:w-1/2">
                    <img
                        alt="A black and white image of a shirtless man taking a mirror selfie"
                        className="w-full"
                        height="800"
                        src="https://storage.googleapis.com/a1aa/image/aItgjywcl1qfZahjNriKzweivTWQlEiOw78N0U7Z1oE6gE8TA.jpg"
                        width="600"
                    />
                </div>
                {/* Post Content */}
                <div className="md:w-1/2 p-4">
                    {/* User Info */}
                    <div className="flex items-center mb-4">
                        <img
                            alt="User  profile picture"
                            className="w-10 h-10 rounded-full"
                            height="40"
                            src="https://storage.googleapis.com/a1aa/image/2gGxyiSwavJPHhyTEVexeL58qWEhfSRAN0tUVCLTLuqxBJ4nA.jpg"
                            width="40"
                        />
                        <div className="ml-3">
                            <p className="font-semibold">tf.vikram_</p>
                        </div>
                        <div className="ml-auto">
                            <i className="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
                    {/* Post Caption */}
                    <p className="mb-4">
                        <span className="font-semibold">tf.vikram_</span>
                        Just posting these as a checkpoint for where I would reach........gotta know na where it all started!!!
                    </p>
                    {/* Comments */}
                    <div className="space-y-4">
                        <div>
                            <p>
                                <span className="font-semibold">rajveer_thakur_2003</span>
                                A goood starting point🔥
                            </p>
                        </div>
                        <div>
                            <p>
                                <span className="font-semibold">_debagyanb_</span>
                                Fitness partners before you hire me as a script writer
                            </p>
                            <p className="text-gray-500 text-sm">View replies (1)</p>
                        </div>
                        <div>
                            <p>
                                <span className="font-semibold">dev_ch_0</span>
                                😍😍
                            </p>
                        </div>
                        <div>
                            <p>
                                <span className="font-semibold">tushar__17</span>
                                Bro ❤️🔥
                            </p>
                        </div>
                        <div>
                            <p>
                                <span className="font-semibold">chirag.1503</span>
                                Mera maal, mera maal😅
                            </p>
                        </div>
                        <div>
                            <p>
                                <span className="font-semibold">aman_pandey_____</span>
                                🔥🔥
                            </p>
                        </div>
                        <div>
                            <p>
                                <span className="font-semibold">_hitesh_singh</span>
                                Mote
                            </p>
                        </div>
                    </div>
                    {/* Likes and Date */}
                    <div className="mt-4">
                        <p className="text-gray-500">
                            Liked by
                            <span className="font-semibold">e.k.k.u.18</span>
                            and 68 others
                        </p>
                        <p className="text-gray-500 text-sm">June 26</p>
                    </div>
                    {/* Add Comment */}
                    <div className="mt-4 flex items-center border-t border-gray-700 pt-4">
                        <input
                            className="bg-black text-white w-full focus:outline-none"
                            placeholder="Add a comment..."
                            type="text"
                        />
                        <button className="text-blue-500 ml-2">Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostZoom;