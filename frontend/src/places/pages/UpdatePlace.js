import React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/form-hook';

import './PlaceForm.css';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire state',
    description: 'Sky scraper',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg',
    address: '20 W 34th St., New York, NY 10001',
    creatorId: 'u1',
    location: {
      lat: 40.7484,
      lng: -73.9878,
    },
  },
  {
    id: 'p2',
    title: 'Empire state',
    description: 'Sky scraper',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg',
    address: '20 W 34th St., New York, NY 10001',
    creatorId: 'u2',
    location: {
      lat: 40.7484,
      lng: -73.9878,
    },
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);

  const [formSate, inputHandler] = useForm(
    {
      title: {
        value: identifiedPlace.title,
        isValid: true,
      },
      description: {
        value: identifiedPlace.description,
        isValid: true,
      },
    },
    true
  );

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formSate.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className='center'>
        <h2>Place not found</h2>
      </div>
    );
  }

  return (
    <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Enter a valid title'
        onInput={inputHandler}
        initialValue={formSate.inputs.title.value}
        initialValid={formSate.inputs.title.isValid}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Enter a valid description (min. 5 char)'
        onInput={inputHandler}
        initialValue={formSate.inputs.description.value}
        initialValid={formSate.inputs.description.isValid}
      />
      <Button type='submit' disabled={!formSate.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
