# ChildInfoResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**fullName** | **string** |  | [optional] [default to undefined]
**dateOfBirth** | **string** |  | [optional] [default to undefined]
**gender** | [**Genders**](Genders.md) |  | [optional] [default to undefined]
**userId** | **string** |  | [optional] [default to undefined]
**childItems** | [**Array&lt;ChildItemDto&gt;**](ChildItemDto.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ChildInfoResponseDto } from './api';

const instance: ChildInfoResponseDto = {
    id,
    fullName,
    dateOfBirth,
    gender,
    userId,
    childItems,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
