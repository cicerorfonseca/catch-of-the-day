import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  renderOrder = (key) => {
    const { fishes, order } = this.props;
    const fish = fishes[key];
    const qty = order[key];
    const isAvailable = fish && fish.status === 'available';

    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry, the {fish ? fish.name : 'fish'} is no longer available.
        </li>
      );
    } else {
      return (
        <li key={key}>
          {qty}lbs {fish.name}
          {formatPrice(qty * fish.price)}
        </li>
      );
    }
  };

  render() {
    const { fishes, order } = this.props;
    const orderIds = Object.keys(order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = fishes[key];
      const qty = order[key];
      const isAvailable = fish && fish.status === 'available';

      if (isAvailable) {
        return prevTotal + qty * fish.price;
      }

      return prevTotal;
    }, 0);

    return (
      <div className='order-wrap'>
        <h2>Order</h2>
        <ul className='order'>{orderIds.map(this.renderOrder)}</ul>
        <div className='total'>
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
