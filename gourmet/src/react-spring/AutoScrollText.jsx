import React,{useState} from 'react'
import { useSpring, animated } from 'react-spring'

const AutoScrollText = () => {
   const [flip, set] = useState(false)

   const words = ['Gourmet', 'Cocktails.', 'Meals', 'Love.']

   const { scroll } = useSpring({
      scroll: (words.length - 1) * 50,
      from: { scroll: 0 },
      reset: true,
      reverse: flip,
      delay: 200,
      onRest: () => set(!flip),
   })
   return (
      <animated.div
      style={{
         position: 'relative',
         width: '100%',
         height: 60,
         overflow: 'auto',
         fontSize: '1em',
         marginTop:200 ,
         border:"1px solid black"
      }}
      scrollTop={scroll}>
      {words.map((word, i) => (
         <div
            key={`${word}_${i}`}
            style={{ width: '100%', height: 120, textAlign: 'center' }}>
            {word}
         </div>
      ))}
      </animated.div>
   )
}

export default AutoScrollText