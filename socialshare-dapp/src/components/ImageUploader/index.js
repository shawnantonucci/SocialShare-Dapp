import React from "react";
import ImageUploader from "react-images-upload";
const Compress = require("compress.js");

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pictures: [], file: null };
        this.onDrop = this.onDrop.bind(this);
    }

    reduceFile = file => {
        // Initialization
        const compress = new Compress();
        const files = file;
        compress
            .compress(files, {
                size: 5, // the max size in MB, defaults to 2MB
                quality: 0.75, // the quality of the image, max is 1,
                maxWidth: 1920, // the max width of the output image, defaults to 1920px
                maxHeight: 1920, // the max height of the output image, defaults to 1920px
                resize: true // defaults to true, set false if you do not want to resize the image width and height
            })
            .then(data => {
                // returns an array of compressed images
                // console.log(data[0])
                // this.setState({ file: data });
                this.props.onDone(data);
            });
    };

    onDrop(picture) {
        // this.setState({
        //     pictures: this.state.pictures.concat(picture)
        // });
        this.reduceFile(picture);
    }

    render() {
        return (
            <ImageUploader
                withIcon={true}
                singleImage={true}
                withPreview={true}
                buttonText="Choose images"
                onChange={this.onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
            />
        );
    }
}

export default ImageUpload;
