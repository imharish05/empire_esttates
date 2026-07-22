import React,{useState} from 'react'
import ReactDOM from 'react-dom'
import ModalVideo from 'react-modal-video'
import { FaPlay } from '../../icons';

const VideoPopup = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <React.Fragment>
      <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="Dj6CKxQue7U" onClose={() => setOpen(false)} />
      <button className="popup-youtube slide-play-button border-0" onClick={()=> setOpen(true)} ><FaPlay  /></button>
    </React.Fragment>
  )
}


const VideoPopup2 = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <React.Fragment>
      <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="Dj6CKxQue7U" onClose={() => setOpen(false)} />
      <button className="popup-youtube slide-play-button border-0" onClick={()=> setOpen(true)} ><FaPlay style={{color:'#a6611c'}} /></button>
    </React.Fragment>
  )
}
export  {VideoPopup2};
export default VideoPopup;