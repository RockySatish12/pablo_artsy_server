import React from 'react'

const ImageView = props=>{
        return (
                <div>
                    <img src={props.record.params.imageUrl} 
                    alt="profile-photo"
                    width="100" height="100" 
                    />
                </div>
    );
    }

export default ImageView;