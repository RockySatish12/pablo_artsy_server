import React from 'react'

const ImageView = props=>{
        return (
                <div>
                    <img src={props.record.params.imageUrl} 
                    alt="profile-photo"
                    width="300" height="300" 
                    />
                </div>
    );
    }

export default ImageView;