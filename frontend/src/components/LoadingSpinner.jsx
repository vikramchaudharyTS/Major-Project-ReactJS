//@ts-nocheck
import { motion } from "framer-motion";

const LoadingSpinner = () => {
	return (
		<div className='min-h-screen w-[86vw] bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-900 flex items-center justify-center relative overflow-hidden'>
			{/* Simple Loading Spinner */}
			<motion.div
				className='w-16 h-16 border-4 border-t-4 border-t-zinc-500 border-zinc-200 rounded-full'
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
			/>
		</div>
	);
};

export default LoadingSpinner;