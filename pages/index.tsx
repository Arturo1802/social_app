import type { NextPage } from 'next' 
import axios from 'axios'
import { Content } from '../types'; 
import Card from '../components/Card';
import NoResults from '../components/NoResults';


interface IProps {
   content: Content[]
}



const Home  = ({content}:IProps) => {
  console.log(content);
  return (
    <div className='flex flex-col gap-10 videos overflow-scroll max-h-[96%]'>
      {content.length? (content.map((content: Content)=> (
        <Card post= {content} key={content._id} />
      ))
      ): (
        <NoResults text="No content to show"/>
      )
      }
    </div>
  )
}
export const getServerSideProps= async () => {
  const {data} = await axios.get(`http://localhost:3000/api/post`); 
  return{
    props: {
      content:data
    }
  }
}
export default Home
