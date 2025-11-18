# CustomerResource


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**referenceCode** | **string** |  | [optional] [default to undefined]
**createdDate** | **number** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**surname** | **string** |  | [optional] [default to undefined]
**identityNumber** | **string** |  | [optional] [default to undefined]
**email** | **string** |  | [optional] [default to undefined]
**gsmNumber** | **string** |  | [optional] [default to undefined]
**billingAddress** | [**Address**](Address.md) |  | [optional] [default to undefined]
**shippingAddress** | [**Address**](Address.md) |  | [optional] [default to undefined]

## Example

```typescript
import { CustomerResource } from './api';

const instance: CustomerResource = {
    referenceCode,
    createdDate,
    status,
    name,
    surname,
    identityNumber,
    email,
    gsmNumber,
    billingAddress,
    shippingAddress,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
