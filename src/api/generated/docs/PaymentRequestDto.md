# PaymentRequestDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**locale** | **string** |  | [optional] [default to undefined]
**conversationId** | **string** |  | [optional] [default to undefined]
**cardHolderName** | **string** |  | [optional] [default to undefined]
**cardNumber** | **string** |  | [optional] [default to undefined]
**expirationMonth** | **number** |  | [optional] [default to undefined]
**expirationYear** | **number** |  | [optional] [default to undefined]
**cvc** | **string** |  | [optional] [default to undefined]
**pricingPlanId** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { PaymentRequestDto } from './api';

const instance: PaymentRequestDto = {
    locale,
    conversationId,
    cardHolderName,
    cardNumber,
    expirationMonth,
    expirationYear,
    cvc,
    pricingPlanId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
