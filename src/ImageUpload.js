import { useState, useEffect } from 'react'


const ImageUpload = (props) => {
    const [image, setImage] = useState(null)




    useEffect( () => {
        if(!image) {
            return
        } 
        const fileReader = new FileReader()
        fileReader.onload = () => {
            props.setimage(fileReader.result.split("base64,")[1])
        }
        fileReader.readAsDataURL(image)
    }, [image])

    const onChangeImageHandler = (event) => {
        console.log("inside onChangeImageHandler, a file has been chosen/changed");
        //as soon as the value of the <input type=file/> changes we grab the value which is an array of files.
        const filesArray = event.target.files; //grabbing array of files
        let imageFile;
        if (filesArray && filesArray.length === 1) {
          imageFile = filesArray[0];
          console.log(imageFile);
          setImage(() => imageFile);
        } else {
          console.log("Accepts 1 file please.");
        }
      };




      return (
        <div className="form-control">
          <input
            id={props.id}
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={(e) => onChangeImageHandler(e)}
          />
          </div>
      );





}


export default ImageUpload