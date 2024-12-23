import React from "react";

const Trend = () => {
  return (
    <div>
      <h1>Trending Items</h1>
      <div>
        <table className="basic font-semibold">
          <thead>
            <tr>
              <td>Product's name</td>
              <td>sells</td>
              <td>Available items</td>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, index) => (
              <tr key={index} className="text-sm text-gray-700 ">
                <td>Sumsung glaxy S24</td>
                <td>80</td>
                <td>14</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trend;
