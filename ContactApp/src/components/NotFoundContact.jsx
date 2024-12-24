import { FaUserAltSlash } from "react-icons/fa";

const NotFoundContact = () => {
  return (
    <div className="text-center h-[70vh] flex flex-col gap-2 items-center justify-center">
      <FaUserAltSlash className="text-8xl text-white"/>
      <h3 className="text-white">Contact Not Found</h3>
    </div>
  );
};

export default NotFoundContact;
