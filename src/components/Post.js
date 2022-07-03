import React,{useRef, useState, useEffect} from 'react'
import useDebounce from '../hooks/useDebounce'
import {options} from '../helper/field'
import Modal from './Modal'
import '../App.css'


const Post = () => {
  const [search, setSearch]  = useState("")
  const [result, setResult] = useState([])
  const [selectedGif, setSelectedGif] = useState("")
  const [isCheck, setIsCheck] = useState({typed: false, selected: false})

  const debouncedSearch = useDebounce(search, 300)
  const modalRef = useRef()
  const openModal = (e) => {
    modalRef.current.openModal()
  }

  
  const handleKeyDown = (e) => {
    if(e.key=== 'Enter' && e.target.value.toLowerCase())
    setSearch(e.target.value)
  }
  
  useEffect(()=>{
    const API_KEY = 'ExfGsEKdFaonSBC4RfH5V3D6K95E5mRV'
    const URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${debouncedSearch}&limit=25&offset=0&rating=g&lang=en`
    async function fetchData(){
      const data = await fetch(URL).then(res=>res.json())
      console.log(data)
      setResult(data)
    }
   if(debouncedSearch) fetchData() 
  },[debouncedSearch])

  const clearResult= ()=> {
    setResult([])
  }

  const imgPathObject = {}
  const listData = []
  for(let idx in result.data){
    imgPathObject.id = result.data[idx].id
    imgPathObject.imageUrl = result.data[idx].images.fixed_height.url
    listData.push({...imgPathObject})
  }
  // console.table(listData)


  return (
    <div className="container">
      <div className="card card-body">
          <div className="d-flex mb-3">
            <div className="avatar avatar-xs me-2">
               <img className="avatar-img rounded-circle" src="../user.png" width={20} height={20}alt=""/> 
            </div>

            <form className="w-100">
              {isCheck === false ? null: 
                <>
                  <textarea className="form-control pe-4 border-0" rows="2" data-autoresize placeholder="Share your thoughts..."></textarea>
                  <img src={selectedGif} alt='' onClick={()=>setIsCheck(true)}/>
                  <button type='submit' style={{border: 'none', backgroundColor: 'transparent', marginLeft: '90%'}}>POST</button>
                </>
              }
            </form>
          </div>
      </div>

			<div className="options">
      {options.map((option)=>(
          <div key={option.id} className="option-item">
            <div className='img-container'>
            	<img src={option.imgUrl} width={35} height={35} className="contain" alt=''/>
            </div>
            {option.id !== 2 ?
            (<div className="text-container">
            	{option.name}
            </div>): (
              <div className="text-container">
                <button onClick={openModal} className='open-modal'>{option.name}</button>
                <Modal ref={modalRef}>
                  <div>
                    <button title="Modal Close" onClick={()=>modalRef.current.close()} style={{border: 'none', backgroundColor: 'transparent'}}>X</button>
                  </div>
                  <div>
                    <input type='text' placeholder='search' onKeyDown={handleKeyDown} style={{width: '90%'}}/>
                    <button title='Clear Search Result' onClick={clearResult} style={{border: 'none', background: 'transparent'}}><i className='fa fa-close'></i></button>
                    <table className='data-table'>
                    {listData.map((data) => 
                    <tr key={data.id} style={{}}>
                      <td><img src={data.imageUrl}alt='' onClick={()=>setSelectedGif(data.imageUrl)}/></td>
                    </tr>)}
                    </table>
                  </div>
                </Modal>
            </div>
            )
            }
          </div>
				))}
			</div>
    </div>
  )
}

export default Post