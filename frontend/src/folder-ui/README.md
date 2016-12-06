## ItemTable

 * `fields` (array) - the column descriptors
 * `data` (array) - the data
 * `selectable` (boolean) - can the user select rows
 * `multiSelectable` (boolean) - can the user select multiple rows
 * `selected` (array) - an array of currently selected items
 * `showCheckboxes` (boolean) - display selectable checkboxes on each row
 * `height` (style)
 * `showHeader` (boolean) - whether to show the column titles
 * `onRowSelection(idArray)` - run when the current selection changes

Each field in the `fields` property has:

 * `name` - the name of field to use as the data property
 * `title` - use this as the column title (defaults to use `name`)
 * `style` - use this style object for the contents
 * `headerStyle` - use this style object for the header
 * `render(data, field)` - a custom function to render the cell contents
 * `preventRowSelection` - prevent a click selecting the row

## Tree

 * `data` (object) - a flat map of id -> object
 * `children` (object) - a flat map of id -> [childids]
 * `rootids` (array) - the top level item ids
 * `open` (object) - a flat map of id -> true
 * `title` (string) - add a title above the tree
 * `styles` (object) - add extra styles
   * `selected` - background color
   * `header` - margins
 * `getIcon(item, theme)` - return the icon for one item
 * `selectItem(item)` - run when an item is clicked
 * `toggleItem(id, open)` - run when an item is toggled

## EditToolbar

 * `title`
 * `icon`
 * `readOnly`
 * `cancel()`
 * `revert()`
 * `save()`

## ListToolbar

 * `title`
 * `icon`
 * `actionButtonTitle` - the title of the `actions` button
 * `getActions()` - return an array of actions for the actions dropdown
 * `getExtraButtons()` - return an array of extra button descriptors

## Form

 * `data`
 * `meta`
 * `schema`
 * `library`
 * `onUpdate(data, meta)`
 * `getContext()`

## ToolbarWrapper

 * `toolbar`
 * `main`

## TreeWrapper

 * `sidebar`
 * `main`


## Database API

Each object that does database stuff must provide:

 * `loadTree(done)`
 * `loadChildren(id, done)`
 * `loadDeepChildren(id, done)`
 * `loadItem(id, done)`
 * `addItem(parentid, data, done)`
 * `saveItem(id, data, done)`
 * `deleteItem(id, done)`
 * `mapPasteData(mode, data)`

## Ajax Database

Pass an object that knows the urls for each endpoint:

```javascript
const base = '/api/v1'
const urls = {
  loadTree: base + '/tree',
  loadChildren: base + '/children/:id',
  loadDeepChildren: base + '/deepchildren/:id',
  loadItem: base + '/item/:id',
  addItem: base + '/item/:parent',
  saveItem: base + '/item/:id',
  deleteItem: base + '/item/:id'
}
```


## Routes

```javascript
<Route component={NavWrapper}>
  <Route path={opts.path} components={views.tree} onEnter={onEnter}>
    <IndexRoute components={views.view} />
    <Route path="view" components={views.view} />
    <Route path="view/:id" components={views.view} />
    <Route path="delete/:parent/:ids" components={views.view} />
    <Route path="edit/:id" components={views.edit} />
    <Route path="edit/:parent/:id" components={views.edit} />
    <Route path="add/:parent/:type" components={views.edit} />
  </Route>
</Route>
```

