/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AiOutlineShopping } from 'react-icons/ai';
import {
  Nav,
  Button,
  Image,
} from 'react-bootstrap';
import { checkUser, signIn, signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [myUser, setMyUser] = useState();

  useEffect(() => {
    checkUser(user?.uid).then((data) => setMyUser(data[0]));
  }, []);

  return (
    <>
      <div className="navbar-container">
        <p className="logo-icon">
          <Link href="/">
            <img
              src="/assets/ecart.png"
              alt="storelogo"
              className="store-image"
            />
          </Link>
        </p>
        <div className="navbar-Logos">
          <Link passHref href="/OrderItems">
            <button type="button" className="cart-icon">
              <AiOutlineShopping />
            </button>
          </Link>
          {myUser ? (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div id="Profile-logo" role="button" tabIndex={0} onClick={() => { setOpen(!open); }}>
              <button type="button" id="drop-btn" style={{ marginRight: '25px' }} onClick={() => setOpen((menu) => !menu)}>
                <Image
                  id="Logo"
                  src={user?.fbUser?.photoURL}
                  border-radius="250px"
                  height="37"
                  width="37"
                />
              </button>
              {open && (
              <div className="dropdown">
                <ul>
                  <Link passHref href="/">
                    <li>Home</li>
                  </Link>
                  {myUser.isSeller ? (
                    <>
                      <Link passHref href="/ItemFormPage">
                        <li>Add an Item</li>
                      </Link>
                      <Link passHref href="/ListOfOrders">
                        <li>View Orders</li>
                      </Link>
                    </>
                  ) : (
                    <Link passHref href="/ListOfOrders">
                      <li>My orders</li>
                    </Link>
                  )}

                  <li><button type="button" id="drop-btn" onClick={signOut}> Sign Out</button></li>
                </ul>
              </div>
              )}
            </div>
          )
            : (
              <Nav className="sign-in-btn">
                <Button variant="danger" onClick={signIn}>Sign In</Button>
              </Nav>

            )}
        </div>
      </div>

    </>
  );
}
