
type Props = {
    text:string
    onOpen:() => void
}

const MyButton = ({ text, onOpen }:Props) => {

  return (
    <button
          onClick={onOpen}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 cursor-pointer"
        >
          {text}
    </button>
  )
}

export default MyButton