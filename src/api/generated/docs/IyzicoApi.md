# IyzicoApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiIyzico3dsCallbackPost**](#apiiyzico3dscallbackpost) | **POST** /api/iyzico/3ds-callback | |
|[**apiIyzicoActivateSubscriptionPost**](#apiiyzicoactivatesubscriptionpost) | **POST** /api/iyzico/activate-subscription | |
|[**apiIyzicoCancelSubscriptionPost**](#apiiyzicocancelsubscriptionpost) | **POST** /api/iyzico/cancel-subscription | |
|[**apiIyzicoCardUpdateCallbackPost**](#apiiyzicocardupdatecallbackpost) | **POST** /api/iyzico/card-update-callback | |
|[**apiIyzicoCreateCustomerPost**](#apiiyzicocreatecustomerpost) | **POST** /api/iyzico/create-customer | |
|[**apiIyzicoInit3dsPaymentPost**](#apiiyzicoinit3dspaymentpost) | **POST** /api/iyzico/init-3ds-payment | |
|[**apiIyzicoListProductsPost**](#apiiyzicolistproductspost) | **POST** /api/iyzico/list-products | |
|[**apiIyzicoPaymentDetailPost**](#apiiyzicopaymentdetailpost) | **POST** /api/iyzico/payment-detail | |
|[**apiIyzicoRetrievePaymentPost**](#apiiyzicoretrievepaymentpost) | **POST** /api/iyzico/retrieve-payment | |
|[**apiIyzicoRetrieveSubscriptionPost**](#apiiyzicoretrievesubscriptionpost) | **POST** /api/iyzico/retrieve-subscription | |
|[**apiIyzicoRetrySubscriptionPost**](#apiiyzicoretrysubscriptionpost) | **POST** /api/iyzico/retry-subscription | |
|[**apiIyzicoSearchSubscriptionPost**](#apiiyzicosearchsubscriptionpost) | **POST** /api/iyzico/search-subscription | |
|[**apiIyzicoStartSubscriptionPost**](#apiiyzicostartsubscriptionpost) | **POST** /api/iyzico/start-subscription | |
|[**apiIyzicoUpdateCustomerPost**](#apiiyzicoupdatecustomerpost) | **POST** /api/iyzico/update-customer | |
|[**apiIyzicoUpdateSubscriptionCardPost**](#apiiyzicoupdatesubscriptioncardpost) | **POST** /api/iyzico/update-subscription-card | |
|[**apiIyzicoUpdateSubscriptionPaymentsPost**](#apiiyzicoupdatesubscriptionpaymentspost) | **POST** /api/iyzico/update-subscription-payments | |
|[**apiIyzicoUpgradeSubscriptionPost**](#apiiyzicoupgradesubscriptionpost) | **POST** /api/iyzico/upgrade-subscription | |

# **apiIyzico3dsCallbackPost**
> apiIyzico3dsCallbackPost()


### Example

```typescript
import {
    IyzicoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IyzicoApi(configuration);

let status: string; // (optional) (default to undefined)
let conversationId: string; // (optional) (default to undefined)
let paymentId: string; // (optional) (default to undefined)
let mdStatus: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiIyzico3dsCallbackPost(
    status,
    conversationId,
    paymentId,
    mdStatus
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **status** | [**string**] |  | (optional) defaults to undefined|
| **conversationId** | [**string**] |  | (optional) defaults to undefined|
| **paymentId** | [**string**] |  | (optional) defaults to undefined|
| **mdStatus** | [**string**] |  | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiIyzicoActivateSubscriptionPost**
> IyzipayResourceV2BaseCommandResult apiIyzicoActivateSubscriptionPost()


### Example

```typescript
import {
    IyzicoApi,
    Configuration,
    SubscriptionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new IyzicoApi(configuration);

let subscriptionRequest: SubscriptionRequest; // (optional)

const { status, data } = await apiInstance.apiIyzicoActivateSubscriptionPost(
    subscriptionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **subscriptionRequest** | **SubscriptionRequest**|  | |


### Return type

**IyzipayResourceV2BaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiIyzicoCancelSubscriptionPost**
> IyzipayResourceV2BaseCommandResult apiIyzicoCancelSubscriptionPost()


### Example

```typescript
import {
    IyzicoApi,
    Configuration,
    SubscriptionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new IyzicoApi(configuration);

let subscriptionRequest: SubscriptionRequest; // (optional)

const { status, data } = await apiInstance.apiIyzicoCancelSubscriptionPost(
    subscriptionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **subscriptionRequest** | **SubscriptionRequest**|  | |


### Return type

**IyzipayResourceV2BaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiIyzicoCardUpdateCallbackPost**
> apiIyzicoCardUpdateCallbackPost()


### Example

```typescript
import {
    IyzicoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IyzicoApi(configuration);

const { status, data } = await apiInstance.apiIyzicoCardUpdateCallbackPost();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiIyzicoCreateCustomerPost**
> CustomerResourceResponseDataBaseCommandResult apiIyzicoCreateCustomerPost()


### Example

```typescript
import {
    IyzicoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IyzicoApi(configuration);

const { status, data } = await apiInstance.apiIyzicoCreateCustomerPost();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**CustomerResourceResponseDataBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiIyzicoInit3dsPaymentPost**
> PaymentResponseDtoBaseCommandResult apiIyzicoInit3dsPaymentPost()


### Example

```typescript
import {
    IyzicoApi,
    Configuration,
    PaymentRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new IyzicoApi(configuration);

let paymentRequestDto: PaymentRequestDto; // (optional)

const { status, data } = await apiInstance.apiIyzicoInit3dsPaymentPost(
    paymentRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **paymentRequestDto** | **PaymentRequestDto**|  | |


### Return type

**PaymentResponseDtoBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiIyzicoListProductsPost**
> ProductResourceResponsePagingDataBaseCommandResult apiIyzicoListProductsPost()


### Example

```typescript
import {
    IyzicoApi,
    Configuration,
    IyzicoPagingRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new IyzicoApi(configuration);

let iyzicoPagingRequest: IyzicoPagingRequest; // (optional)

const { status, data } = await apiInstance.apiIyzicoListProductsPost(
    iyzicoPagingRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **iyzicoPagingRequest** | **IyzicoPagingRequest**|  | |


### Return type

**ProductResourceResponsePagingDataBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiIyzicoPaymentDetailPost**
> PlanResourceResponseDataBaseCommandResult apiIyzicoPaymentDetailPost()


### Example

```typescript
import {
    IyzicoApi,
    Configuration,
    PaymentPlanDetailDto
} from './api';

const configuration = new Configuration();
const apiInstance = new IyzicoApi(configuration);

let paymentPlanDetailDto: PaymentPlanDetailDto; // (optional)

const { status, data } = await apiInstance.apiIyzicoPaymentDetailPost(
    paymentPlanDetailDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **paymentPlanDetailDto** | **PaymentPlanDetailDto**|  | |


### Return type

**PlanResourceResponseDataBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiIyzicoRetrievePaymentPost**
> PaymentBaseCommandResult apiIyzicoRetrievePaymentPost()


### Example

```typescript
import {
    IyzicoApi,
    Configuration,
    RetrievePaymentRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new IyzicoApi(configuration);

let retrievePaymentRequest: RetrievePaymentRequest; // (optional)

const { status, data } = await apiInstance.apiIyzicoRetrievePaymentPost(
    retrievePaymentRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **retrievePaymentRequest** | **RetrievePaymentRequest**|  | |


### Return type

**PaymentBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiIyzicoRetrieveSubscriptionPost**
> IyzipayResourceV2BaseCommandResult apiIyzicoRetrieveSubscriptionPost()


### Example

```typescript
import {
    IyzicoApi,
    Configuration,
    SubscriptionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new IyzicoApi(configuration);

let subscriptionRequest: SubscriptionRequest; // (optional)

const { status, data } = await apiInstance.apiIyzicoRetrieveSubscriptionPost(
    subscriptionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **subscriptionRequest** | **SubscriptionRequest**|  | |


### Return type

**IyzipayResourceV2BaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiIyzicoRetrySubscriptionPost**
> IyzipayResourceV2BaseCommandResult apiIyzicoRetrySubscriptionPost()


### Example

```typescript
import {
    IyzicoApi,
    Configuration,
    SubscriptionRetryRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new IyzicoApi(configuration);

let subscriptionRetryRequest: SubscriptionRetryRequest; // (optional)

const { status, data } = await apiInstance.apiIyzicoRetrySubscriptionPost(
    subscriptionRetryRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **subscriptionRetryRequest** | **SubscriptionRetryRequest**|  | |


### Return type

**IyzipayResourceV2BaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiIyzicoSearchSubscriptionPost**
> SubscriptionResourceResponsePagingDataBaseCommandResult apiIyzicoSearchSubscriptionPost()


### Example

```typescript
import {
    IyzicoApi,
    Configuration,
    SubscriptionSearchRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new IyzicoApi(configuration);

let subscriptionSearchRequest: SubscriptionSearchRequest; // (optional)

const { status, data } = await apiInstance.apiIyzicoSearchSubscriptionPost(
    subscriptionSearchRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **subscriptionSearchRequest** | **SubscriptionSearchRequest**|  | |


### Return type

**SubscriptionResourceResponsePagingDataBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiIyzicoStartSubscriptionPost**
> PaymentResponseDtoBaseCommandResult apiIyzicoStartSubscriptionPost()


### Example

```typescript
import {
    IyzicoApi,
    Configuration,
    PaymentRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new IyzicoApi(configuration);

let paymentRequestDto: PaymentRequestDto; // (optional)

const { status, data } = await apiInstance.apiIyzicoStartSubscriptionPost(
    paymentRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **paymentRequestDto** | **PaymentRequestDto**|  | |


### Return type

**PaymentResponseDtoBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiIyzicoUpdateCustomerPost**
> CustomerResourceResponseDataBaseCommandResult apiIyzicoUpdateCustomerPost()


### Example

```typescript
import {
    IyzicoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IyzicoApi(configuration);

const { status, data } = await apiInstance.apiIyzicoUpdateCustomerPost();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**CustomerResourceResponseDataBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiIyzicoUpdateSubscriptionCardPost**
> UpdateSubscriptionCardResponseBaseCommandResult apiIyzicoUpdateSubscriptionCardPost()


### Example

```typescript
import {
    IyzicoApi,
    Configuration,
    UpdateSubscriptionCardRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new IyzicoApi(configuration);

let updateSubscriptionCardRequestDto: UpdateSubscriptionCardRequestDto; // (optional)

const { status, data } = await apiInstance.apiIyzicoUpdateSubscriptionCardPost(
    updateSubscriptionCardRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateSubscriptionCardRequestDto** | **UpdateSubscriptionCardRequestDto**|  | |


### Return type

**UpdateSubscriptionCardResponseBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiIyzicoUpdateSubscriptionPaymentsPost**
> StringBaseCommandResult apiIyzicoUpdateSubscriptionPaymentsPost()


### Example

```typescript
import {
    IyzicoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IyzicoApi(configuration);

let secretKey: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiIyzicoUpdateSubscriptionPaymentsPost(
    secretKey
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **secretKey** | [**string**] |  | (optional) defaults to undefined|


### Return type

**StringBaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiIyzicoUpgradeSubscriptionPost**
> IyzipayResourceV2BaseCommandResult apiIyzicoUpgradeSubscriptionPost()


### Example

```typescript
import {
    IyzicoApi,
    Configuration,
    SubscriptionUpgradeRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new IyzicoApi(configuration);

let subscriptionUpgradeRequest: SubscriptionUpgradeRequest; // (optional)

const { status, data } = await apiInstance.apiIyzicoUpgradeSubscriptionPost(
    subscriptionUpgradeRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **subscriptionUpgradeRequest** | **SubscriptionUpgradeRequest**|  | |


### Return type

**IyzipayResourceV2BaseCommandResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

