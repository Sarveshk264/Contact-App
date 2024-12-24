import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { db } from "../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import useDisclouse from "../hooks/useDisclouse.js";
import AddAndUpdateContact from "./AddAndUpdateContact";
import { toast } from "react-toastify";

const ContactCard = ({ contacts }) => {
  const { isOpen, onClose, onOpen } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contacts.id}
        className="bg-yellow my-2 flex items-center justify-between gap-2 rounded-2xl p-2"
      >
        <div className="align-center flex gap-2">
          <div className="flex items-center justify-center">
            <FaRegUserCircle className="text-orange text-4xl" />
          </div>
          <div className="flex flex-col text-black">
            <h1 className="text-bold">{contacts.name}</h1>
            <p className="text-sm">{contacts.email}</p>
          </div>
        </div>
        <div className="my-auto flex cursor-pointer gap-2 text-xl text-black">
          <FaRegEdit className="cursor-pointer" onClick={onOpen} />
          <FaTrashAlt
            onClick={() => deleteContact(contacts.id)}
            className="text-orange"
          />
        </div>
      </div>
      <AddAndUpdateContact isUpdate contact={contacts} isopen={isOpen} onClose={onClose} />
    </>
  );
};

export default ContactCard;
