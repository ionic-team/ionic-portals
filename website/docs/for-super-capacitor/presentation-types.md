import useBaseUrl from '@docusaurus/useBaseUrl';

# Presentation Types

The `type` option within the `MicroappOptions` interface allows you to specify how the microapp will be presented to users. This section of the documentation provides an example of the available presentation types.

## Push

```typescript
const microappOptions: MicroappOptions = {
  name: 'Microapp Name';
  type: 'push';
}
```

<em
  style={{
    textAlign: 'center',
    display: 'block',
  }}
>
  <img src={useBaseUrl('/img/super-capacitor/presentation-types/push.gif')} width="300px" />
</em>

## Modal

### FullScreen

```typescript
const microappOptions: MicroappOptions = {
  name: 'Microapp Name';
  type: 'modal';
  modalStyle: 'fullScreen';
}
```

<em
  style={{
    textAlign: 'center',
    display: 'block',
  }}
>
  <img src={useBaseUrl('/img/super-capacitor/presentation-types/fullscreen.gif')} width="300px" />
</em>

### PageSheet

```typescript
const microappOptions: MicroappOptions = {
  name: 'Microapp Name';
  type: 'modal';
  modalStyle: 'pageSheet';
}
```

<em
  style={{
    textAlign: 'center',
    display: 'block',
  }}
>
  <img src={useBaseUrl('/img/super-capacitor/presentation-types/pagesheet.gif')} width="300px" />
</em>
