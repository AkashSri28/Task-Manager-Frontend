// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, NavLink, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import DashboardNav from '../components/DashboardNav';
import Board from './Board';
import '../styles/Dashboard.css';

const Dashboard = () => {

  
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');



  // const handleDeleteCard = async (boardId, listId, cardId) => {
  //   try {
  //     await axios.delete(`http://localhost:3000/boards/${boardId}/lists/${listId}/cards/${cardId}`);

  //     const updatedBoards = boards.map((board) => {
  //       if (board._id === boardId) {
  //         return {
  //           ...board,
  //           lists: board.lists.map((list) => {
  //             if (list._id === listId) {
  //               return {
  //                 ...list,
  //                 cards: list.cards.filter((card) => card._id !== cardId),
  //               };
  //             }
  //             return list;
  //           }),
  //         };
  //       }
  //       return board;
  //     });

  //     setBoards(updatedBoards);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="container">
      <DashboardNav/>
      <Board/>
      {/* <h2>Dashboard</h2>
      {boards.map((board) => (
        <div key={board._id}>
          <h3>{board.title}</h3>
          {board.lists.map((list) => (
            <div key={list._id}>
              <h4>{list.title}</h4>
              <ul>
                {list.cards.map((card) => (
                  <li key={card._id}>
                    <p>{card.title}</p>
                    <p>{card.description}</p>
                    <button onClick={() => handleDeleteCard(board._id, list._id, card._id)}>Delete</button>
                  </li>
                ))}
              </ul>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleCreateCard(board._id, list._id);
              }}>
                <label>
                  Title:
                  <input
                    type="text"
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Description:
                  <input
                    type="text"
                    value={newCardDescription}
                    onChange={(e) => setNewCardDescription(e.target.value)}
                  />
                </label>
                <br />
                <button type="submit">Add Card</button>
              </form>
            </div>
          ))}
        </div>
      ))} */}
    </div>
  );
};

export default Dashboard;
