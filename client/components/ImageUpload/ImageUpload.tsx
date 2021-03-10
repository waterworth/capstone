import React from 'react';
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget';
import { useUpdateProfilePictureMutation } from '../../generated/graphql';
interface ImageUploadProps {
  onUpload: any;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [updateProfilePictureMutation] = useUpdateProfilePictureMutation();
  return (
    <>
      <WidgetLoader />
      <Widget
        sources={['local']}
        resourceType={'image'}
        cloudName={'trackmeet'}
        uploadPreset={'sp74wazy'} // check that an upload preset exists and check mode is signed or unisgned
        style={{
          color: 'white',
          border: 'none',
          width: '120px',
          backgroundColor: 'green',
          borderRadius: '4px',
          height: '25px',
        }} // inline styling only or style id='cloudinary_upload_button'
        folder={'profileImages'} // set cloudinary folder name to send file
        cropping={true}
        onSuccess={(result: any) => {
          updateProfilePictureMutation({
            variables: {
              image: result.info.secure_url,
            },
          });
          onUpload(result.info.secure_url, result.info.original_filename);
        }} // add success callback -> returns result
        // onFailure={failureCallBack} // add failure callback -> returns 'response.error' + 'response.result'
        logging={false}
        use_filename={true}></Widget>
    </>
  );
};
