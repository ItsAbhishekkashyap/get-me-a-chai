import React from 'react'

const page = () => {
  return (
    <>
      <div className='text-white flex-col gap-4 items-center h-[45vh] flex justify-center'>
        <div className='font-bold flex items-center gap-2 text-3xl'>Buy Me a Chai <span className=''><img width='70' src="tea.gif" alt="" /></span></div>
        <p>
          A crowdfunding platform for creators. Get funded by your fans and followers. Start now!
        </p>
        <div className='flex gap-2'>
          <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>


          <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>



      <div className='text-white container pb-20 mx-auto'>
        <h1 className='text-white text-2xl py-10 text-center font-bold'>Your fans can buy you a Chai!</h1>
        <div className='flex gap-5 justify-around'>
          <div className="item space-y-3 flex flex-col items-center justify-center  ">
            <img className='rounded-full text-black p-2' src="men.gif" alt="" />
            <p className='font-bold text-lg'>Fund your self</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center  ">
            <img className='rounded-full text-black p-2' src="coin2.gif" alt="" />
            <p className='font-bold text-lg'>Fund your self</p>
          </div>

          <div className="item space-y-3 pt-8 flex flex-col items-center justify-center ">
            <img className='rounded-full text-black p-2' width={110} src="society.gif" alt="" />
            <p className='font-bold pt-5 text-lg'>Fans want to help</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>
      <div className='text-white container pt-5 pb-20 mx-auto'>
        <h2 className='text-white text-2xl py-10 text-center font-bold'>Learn more about us</h2>
        <div className='flex gap-5 justify-around'>
          <div className="item space-y-3 flex flex-col items-center justify-center  ">
            <img className='rounded-full text-black p-2' src="men.gif" alt="" />
            <p className='font-bold text-lg'>Fund your self</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center  ">
            <img className='rounded-full text-black p-2' src="coin2.gif" alt="" />
            <p className='font-bold text-lg'>Fund your self</p>
          </div>

          <div className="item space-y-3 pt-8 flex flex-col items-center justify-center ">
            <img className='rounded-full text-black p-2' width={110} src="society.gif" alt="" />
            <p className='font-bold pt-5 text-lg'>Fund your self</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default page

