export default {
  name: 'organization',
  label: 'Organization',
  fields: [
    {
      name: 'name',
      label: 'Name',
      required: true
    },
    {
      name: 'description',
      label: 'Description',
      required: false
    }
  ],
  views: {
    list: {
      type: 'list',
      fields: [
        {name: 'name'}
      ]
    }
  }
}