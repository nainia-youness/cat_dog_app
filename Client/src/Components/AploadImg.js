import React from 'react';
import ImageUploading from 'react-images-uploading';

export function AploadImg(props) {
  const [images, setImages] = React.useState([]);
 
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const sendToApi = () => {
        if(images!=[])
            props.data.ChangeImgUrl(images[0].data_url)
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={1}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Upload Image
            </button>
            &nbsp;
            {/*<button onClick={onImageRemoveAll}>Remove all images</button>*/}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <br/>
                  <button onClick={() => sendToApi()}>Predict</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}




export default AploadImg







/*import React, { Component } from 'react'
import ImageUploader from 'react-images-upload';

class AploadImg extends Component {
    constructor(props) {
        super(props)
        this.state={
             pictures: [] 
        }
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    render() {
        console.log(this.state.pictures[0].render)
        return (
            <>
                <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                />
                <img src={this.state.pictures[0]} alt="no image"></img>
            </>
        )
    }
}

export default AploadImg*/