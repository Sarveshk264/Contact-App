import "./App.css";

import Navbar from "./components/navbar";
import { ToastContainer } from "react-toastify";

import { db } from "./config/firebase";
import { collection, onSnapshot } from "firebase/firestore";

import { FaSearch } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react";

import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse.js";
import NotFoundContact from "./components/NotFoundContact.jsx";

function App() {
  const [contacts, setContacts] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclouse();
  const [allContacts, setAllContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          console.log(contactsList);
          setContacts(contactsList);
          setAllContacts(contactsList);
        });

        console.log(onSnapshot);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value.toLowerCase();
    const filteredContacts = allContacts.filter((contact) =>
      contact.name.toLowerCase().includes(value),
    );
    setContacts(filteredContacts);
  };

  return (
    <>
      <div className="mx-auto max-w-[370px] gap-4 p-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <FaSearch className="absolute ml-2 text-xl text-white" />
            <input
              onChange={filterContacts}
              type="text"
              className="h-10 flex-grow rounded-md border border-white bg-transparent pl-10 text-white outline-none"
            />
          </div>
          <FaCirclePlus
            onClick={onOpen}
            className="cursor-pointer text-4xl text-white"
          />
        </div>
        <div className="mt-4">
          {contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contacts.map((contacts) => (
              <ContactCard key={contacts.id} contacts={contacts} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContact isopen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default App;
