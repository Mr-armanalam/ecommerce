import React from 'react'

const Recent = () => {
  return (
    <div>
      <h1>Recent Payments</h1>
      <div>
        <table className="basic font-semibold">
          <thead>
            <tr>
              <td>Customer name</td>
              <td className='max-w-80'>Products</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, index) => (
              <tr key={index} className="text-sm text-gray-600 ">
                <td>Arman Alam</td>
                <td className='text-wrap '>Sumsung glaxy, Iphone 14 black, </td>
                <td className='text-green-700'>$1400</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Recent