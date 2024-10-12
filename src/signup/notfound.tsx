import notfound from '../notfound.webp'
export default function Notfound() {
  console.log("working page")
  return (
    <div className='page-not-found'>
      <div><img src={notfound}/></div>
      <div className='page-not-found-info'>uhm.. Not found</div>
    </div>
  )
}
