import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import arrowup from "../assets/arrowup.png"
import comment from "../assets/comment.png"

function FeedbackDisplay() {
    const feedback = useSelector((state) => state.state.data.productRequests)
    const sortValue = useSelector((state) => state.state.sortBy)
    const filterValue = useSelector((state) => state.state.filterBy)
    const productRequestsCopy = [...feedback];
    const [sortIt, setSortIt] = useState(productRequestsCopy.sort((a, b) => b.upvotes - a.upvotes))
    const [filterIt, setFilterIt] = useState(productRequestsCopy.filter(request => request.category === "enhancement"))
    console.log(feedback)
    useEffect(() => {
        if(filterValue === "ALL"){
            setFilterIt(feedback)
        }
        else if(filterValue === "UI"){
            setFilterIt(productRequestsCopy.filter(request => request.category === "ui"))
        }
        else if(filterValue === "UX"){
            setFilterIt(productRequestsCopy.filter(request => request.category === "ux"))
        }
        else if(filterValue === "Enhancement"){
            setFilterIt(productRequestsCopy.filter(request => request.category === "enhancement"))
        }
        else if(filterValue === "Bug"){
            setFilterIt(productRequestsCopy.filter(request => request.category === "bug"))
        }
        else if(filterValue === "Feature"){
            setFilterIt(productRequestsCopy.filter(request => request.category === "feature"))
        }
    }, [filterValue])
    useEffect(() => {
        if(sortValue === "Most Upvotes"){
            setSortIt(productRequestsCopy.sort((a, b) => b.upvotes - a.upvotes))
        }
        else if(sortValue === "Least Upvotes"){
            setSortIt(productRequestsCopy.sort((a, b) => a.upvotes - b.upvotes))
        }
        else if(sortValue === "Most Comments"){
            setSortIt(productRequestsCopy.sort((a, b) => {
                const aCommentsLength = a.comments ? a.comments.length : 0;
                const bCommentsLength = b.comments ? b.comments.length : 0;
                return bCommentsLength - aCommentsLength;
            }))
        }
        else if(sortValue === "Least Comments"){
            setSortIt(productRequestsCopy.sort((a, b) => {
                const aCommentsLength = a.comments ? a.comments.length : 0;
                const bCommentsLength = b.comments ? b.comments.length : 0;
                return aCommentsLength - bCommentsLength;
            }))
        }
    },[sortValue])

  return (
    <main className='bg-grey-white py-8'>
        {filterIt.map((value) => {
            return (
                <div className='bg-white mx-6 mb-4 rounded-xl p-6' key={value.id}>
                <p className='text-sm font-bold text-blue mb-2'>{value.title}</p>
                <p className='text-grey text-sm font-normal mb-2'>{value.description}</p>
                <div className='items-center justify-center bg-grey-white py-1 px-4 rounded-xl text-sm inline-block mb-4'>
                    <p className='text-strong-blue font-semibold'>{value.category[0].toLocaleUpperCase() + value.category.substr(1)}</p>
                </div>
                <div className='flex justify-between'>
                    <button className='flex bg-grey-white items-center gap-2 py-1 px-2 rounded-xl'>
                        <img className='w-2 h-1' src={arrowup} alt='arrowup' />
                        <p className='text-sm text-blue font-bold'>{value.upvotes}</p>
                    </button>
                    <button className='flex items-center gap-1'>
                        <img className='h-4 w-5' src={comment} alt='comments' />
                        <p>{value.comments ? value.comments.length : 0}</p>
                    </button>
                </div>
                </div>
            )
        })}
    </main>
  )
}

export default FeedbackDisplay