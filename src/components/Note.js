function Note({ id, note }) {
  return {
    id: id || randomId(),
    note: note || '',
  }
}

const initialState = {
  notes: [],
  isAddNewEditorShowing: false,
  currentEditingIndex: -1,
}

const notesAppActions = {
  toggleAddNewEditor: 'TOGGLE_ADD_NEW_EDITOR',
  toggleEditor: 'TOGGLE_EDITOR',
  addNewNote: 'ADD_NEW_NOTE',
  updateNote: 'UPDATE_NOTE',
  deleteNote: 'DELETE_NOTE',
}

const reducer = (state, action) => {
  switch (action.type) {
    case notesAppActions.toggleAddNewEditor:
      return // ...
    case notesAppActions.toggleEditor:
      return // ...
    case notesAppActions.addNewNote:
      return // ...
    case notesAppActions.updateNote:
      return // ...
    case notesAppActions.deleteNote: {
      return // ...
  }
}

export default function NotesApp() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  // ...
}

const mapPropsToChildren = children => {
  let indexOfComponent = 0
  const recursiveMap = child => {
    return React.Children.map(child, child => {
      if (!React.isValidElement(child)) {
        return child
      }
      if (child.type.displayName === 'Note') {
        child = React.cloneElement(child, {
          index: indexOfComponent,
          isInEditingMode: indexOfComponent === state.currentEditingIndex,
          dispatch,
        })

        indexOfComponent++
        return child
      }

      if (child.props.children) {
        child = React.cloneElement(child, {
          children: recursiveMap(child.props.children),
        })
      }

      return child
    })
  }

  return recursiveMap(children)
}



