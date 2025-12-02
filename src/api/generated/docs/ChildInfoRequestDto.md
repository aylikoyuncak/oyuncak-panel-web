# ChildInfoRequestDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**userId** | **string** |  | [optional] [default to undefined]
**fullName** | **string** |  | [optional] [default to undefined]
**gender** | [**Genders**](Genders.md) |  | [optional] [default to undefined]
**items** | [**Array&lt;ChildItemDto&gt;**](ChildItemDto.md) |  | [optional] [default to undefined]
**boxNumber** | [**Box**](Box.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ChildInfoRequestDto } from './api';

const instance: ChildInfoRequestDto = {
    id,
    userId,
    fullName,
    gender,
    items,
    boxNumber,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
