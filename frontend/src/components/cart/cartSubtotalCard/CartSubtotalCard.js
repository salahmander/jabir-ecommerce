import React from "react";
import { ListGroup, Button, Card } from "react-bootstrap";

const CartSubtotalCard = ({ cartItems, checkoutHandler }) => {
  return (
    <>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>
              Subtotal (
              {cartItems.reduce(
                (accumulator, currentItem) => accumulator + currentItem.qty,
                0
              )}
              ) Items
            </h2>
            £
            {cartItems
              .reduce(
                (accumulator, currentItem) =>
                  accumulator + currentItem.qty * currentItem.price,
                0
              )
              .toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
};

export default CartSubtotalCard;
