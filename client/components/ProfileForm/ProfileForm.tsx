import { Formik, Form } from 'formik';
import React from 'react';
import Button from '../Button';
import styled from 'styled-components';
import { FormInput } from '../FormInput/FormInput';

interface ProfileFormProps {}

const Section = styled.section`
  display: flex;
  gap: 3rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  border-radius: 1rem;
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
  return (
    <div>
      <h3>Profile Picture</h3>
      <Formik
        initialValues={{
          image: '',
          username: '',
          email: '',
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
        }}>
        <Form>
          <Section>
            <Img
              src='https://via.placeholder.com/250'
              alt='User profile image'
              height={250}
              width={250}
            />
            <Wrapper>
              <Button content='Upload'></Button>
              <ImageReference>userimage.png</ImageReference>
              <span>Images must be 250x250 for optimal usage.</span>
            </Wrapper>
          </Section>
          <Section>
            <FormInput
              name='username'
              type='username'
              label='Username'
              placeholder='Username'></FormInput>
            <FormInput
              name='email'
              type='email'
              label='Email'
              placeholder='Email'></FormInput>
          </Section>
        </Form>
      </Formik>
    </div>
  );
};
