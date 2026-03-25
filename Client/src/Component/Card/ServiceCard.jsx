// // const ServiceCard = ({ icon: Icon, title, description }) => {
  const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 w-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      
      {/* Icon */}
      <div className="bg-blue-100 rounded-xl w-12 h-12 flex items-center justify-center mb-5">
        {Icon && <Icon className="text-blue-600 size-6" />}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 leading-relaxed">
        {description}
      </p>

    </div>
  );
};

export default ServiceCard;

// const ServiceCard = ({ icon: Icon, title, description }) => {
//   return (
//     <div className="bg-white border border-gray-200 rounded-2xl p-6 w-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

//       {/* Icon */}
//       <div className="bg-blue-100 rounded-xl w-12 h-12 flex items-center justify-center mb-5">
//         {Icon && <Icon className="text-blue-600 size-6" />}
//       </div>

//       <h3 className="text-xl font-semibold text-gray-900 mb-3">
//         {title}
//       </h3>

//       <p className="text-gray-500 leading-relaxed">
//         {description}
//       </p>

//     </div>
//   );
// };
// export default ServiceCard;