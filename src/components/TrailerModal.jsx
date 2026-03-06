// const TrailerModal = ({ videoKey, close }) => {

//   if (!videoKey) return null;

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

//       <div className="relative w-[80%] h-[70%]">

//         <button
//           onClick={close}
//           className="absolute -top-10 right-0 text-white text-xl"
//         >
//           ✖
//         </button>

//         <iframe
//           className="w-full h-full"
//           src={`https://www.youtube.com/embed/${videoKey}`}
//           title="Trailer"
//           allowFullScreen
//         ></iframe>

//       </div>

//     </div>
//   );
// };

// export default TrailerModal;