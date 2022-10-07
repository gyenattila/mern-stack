import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form.hook';

import './Auth.css';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';
import { AuthContext } from '../../shared/context/auth.context';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState);
    auth.login();
  };

  const switchModeHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLogin(prevMode => !prevMode);
  };

  return (
    <Card className='authentication'>
      <h2>Login required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLogin && (
          <Input
            element='input'
            id='name'
            type='text'
            label='Your name'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a name.'
            onInput={inputHandler}
          ></Input>
        )}
        <Input
          id='email'
          element='input'
          type='email'
          label='Email'
          validators={[VALIDATOR_EMAIL()]}
          errorText='Please provide a valid email address.'
          onInput={inputHandler}
        />
        <Input
          id='password'
          element='input'
          type='password'
          label='Password'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please provide a valid password.'
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>
          {isLogin ? 'LOGIN' : 'SIGNUP'}
        </Button>
        <Button inverse onClick={switchModeHandler}>
          Switch to {isLogin ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </form>
    </Card>
  );
};

export default Auth;
