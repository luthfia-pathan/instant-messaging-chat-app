import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  // if current user is present then it feteches it's avatar and username and displays it
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  //  changing chat of current
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };


  // SEARCH FUNCTIONALITY
  const sendSearch = (event) => {
    event.preventDefault();
    if (search.length > 0) {
      const filteredContacts = contacts.filter((contact) => {
        const username = contact.username.toLowerCase();
        const searchTerm = search.toLowerCase();
        return username.includes(searchTerm);
      });

      setFilteredContacts(filteredContacts);
      // setSearch("");
    }
  };

  // HTML OF CONTACTS BLOCK
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
          <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/chat.png" alt="chat"/>
            <h3>ChatApp</h3>
          </div>
          <div className="search">
          <form className="input-container" 
          onSubmit={(event) => sendSearch(event)}
            >
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
      </div>
          <div className="contacts">
            { search ? filteredContacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            }) : contacts.map((contact, index) =>{return (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt=""
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            );})}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
// CSS OF CONTACTS SIDE BAR
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 10% 65% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 3.75rem;
      width : 3.75rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .search {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .input-container {
      width: 100%;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      gap: 2rem;
      background-color: #ffffff34;
      input {
        width: 90%;
        height: 60%;
        background-color: transparent;
        color: white;
        border: none;
        padding-left: 1rem;
        font-size: 1.2rem;
  
        &::selection {
          background-color: #9a86f3;
        }
        &:focus {
          outline: none;
        }
      }
      button {
        padding: 0.3rem 2rem;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #9a86f3;
        &:hover {
        background-color: #4e0eff;
  
        }
        border: none;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          padding: 0.3rem 1rem;
          svg {
            font-size: 1rem;
          }
        }
        svg {
          font-size: 2rem;
          color: white;
        }
      }
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
