import { Formik, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import styled from 'styled-components';
import { FormInput } from '../FormInput/FormInput';
import {
  useMeQuery,
  useUpdateProfileMutation,
  useUpdateProfilePictureMutation,
} from '../../generated/graphql';
import Image from 'next/image';
// import {
//   Image,
//   Video,
//   Transformation,
//   CloudinaryContext,
// } from 'cloudinary-react';
import ImageUpload from '../ImageUpload';

interface ProfileFormProps {}

const Section = styled.section`
  display: flex;
  gap: 3rem;
`;

const FormSection = styled(Section)`
  margin-left: -3rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  border-radius: 1rem;
  height: 250px;
  width: 250px;
  object-fit: cover;
`;

const ImageReference = styled.a`
  margin: 1rem 0;
  width: 20rem;
  padding: 1rem;
  border-radius: 0.8rem;
  text-decoration: underline;
  border: 1px solid ${(props) => props.theme.colours['grey-light1']};
`;

export const ProfileForm: React.FC<ProfileFormProps> = ({}) => {
  const { data } = useMeQuery({});
  const [profileImg, setProfileImg] = useState('');
  const [filename, setFilename] = useState('');
  const [updateProfileMutation] = useUpdateProfileMutation();

  const handleUpload = (img: string, original: string) => {
    setProfileImg(img);
    setFilename(original);
  };

  return (
    <div>
      <h3>Profile Picture</h3>
      <Formik
        initialValues={{
          image: '',
          username: data?.me?.username,
          email: data?.me?.email,
        }}
        onSubmit={async (values) => {
          console.log(values);
          await updateProfileMutation({
            variables: {
              userId: parseInt(data!.me!.id!!),
              email: values.email,
              username: values.username,
            },
          });
        }}>
        <Form>
          <Section>
            <Img src={data?.me?.profile.picture} alt='User profile image' />
            <Wrapper>
              <ImageUpload onUpload={handleUpload} />
              <ImageReference>{filename}</ImageReference>
              <span>Images must be 250x250 for optimal usage.</span>
            </Wrapper>
          </Section>
          <FormSection>
            <FormInput
              name='username'
              type='username'
              label='Username'
              placeholder={data?.me?.username}></FormInput>
            <FormInput
              name='email'
              type='email'
              label='Email'
              placeholder={data?.me?.email}></FormInput>
          </FormSection>

          <Button content='Update'></Button>
        </Form>
      </Formik>
    </div>
  );
};
