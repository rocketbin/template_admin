import {_glob} from 'src/assets/global'

export default {
  tables: {
    jsscenes: {
      columns: [
        {
          name: 'actions',
          required: true,
          label: '',
          align: 'right',
          style: 'width: 50px'
        },
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'filename',
          sortable: true,
        },
        {
          name: 'reftype',
          required: true,
          label: 'Type',
          align: 'left',
          field: 'reftype'
        },
        {
          name: 'timestamp',
          required: true,
          label: 'Timestamp',
          align: 'left',
          field: 'timestamp',
          sortable: true
        },
      ],
    }
  }
}
