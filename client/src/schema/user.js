export default {
  name: 'user',
  label: 'User',
  fields: [
    {
      name: 'username',
      label: 'Username',
      required: true
    },
    {
      name: 'firstName',
      label: 'First Name',
      required: false
    },
    {
      name: 'password',
      label: 'Password',
      required: true
    }
  ],
  views: {
    type: 'form',
    login: {
      fields: [
        {name: 'username'},
        {name: 'password'}
      ]
    }
  }
}