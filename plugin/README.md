# ionic-portals

Plugin SDK for Portals

## Install

```bash
npm install ionic-portals
npx cap sync
```

## API

<docgen-index>

* [`echo(...)`](#echo)
* [`getInitialContext()`](#getinitialcontext)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### echo(...)

```typescript
echo(options: { value: string; }) => any
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: string; }</code> |

**Returns:** <code>any</code>

--------------------


### getInitialContext()

```typescript
getInitialContext<T = unknown>() => any
```

**Returns:** <code>any</code>

--------------------


### Interfaces


#### InitialContext

| Prop        | Type                |
| ----------- | ------------------- |
| **`name`**  | <code>string</code> |
| **`value`** | <code>T</code>      |

</docgen-api>
