# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiAuthLoginPost**](#apiauthloginpost) | **POST** /api/auth/login | |
|[**apiAuthMeGet**](#apiauthmeget) | **GET** /api/auth/me | |
|[**apiAuthRefreshTokenPost**](#apiauthrefreshtokenpost) | **POST** /api/auth/refresh-token | |
|[**apiAuthRegisterPost**](#apiauthregisterpost) | **POST** /api/auth/register | |
|[**apiAuthResetPasswordPost**](#apiauthresetpasswordpost) | **POST** /api/auth/reset-password | |

# **apiAuthLoginPost**
> UserBaseModelBaseCommandResult apiAuthLoginPost()


### Example

```typescript
import {
    AuthApi,
    Configuration,
    LoginRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let loginRequestDto: LoginRequestDto; // (optional)

const { status, data } = await apiInstance.apiAuthLoginPost(
    loginRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginRequestDto** | **LoginRequestDto**|  | |


### Return type

**UserBaseModelBaseCommandResult**

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

# **apiAuthMeGet**
> UserBaseModelBaseCommandResult apiAuthMeGet()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.apiAuthMeGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserBaseModelBaseCommandResult**

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

# **apiAuthRefreshTokenPost**
> TokenModelBaseCommandResult apiAuthRefreshTokenPost()


### Example

```typescript
import {
    AuthApi,
    Configuration,
    UserBaseModel
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let userBaseModel: UserBaseModel; // (optional)

const { status, data } = await apiInstance.apiAuthRefreshTokenPost(
    userBaseModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userBaseModel** | **UserBaseModel**|  | |


### Return type

**TokenModelBaseCommandResult**

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

# **apiAuthRegisterPost**
> UserBaseModelBaseCommandResult apiAuthRegisterPost()


### Example

```typescript
import {
    AuthApi,
    Configuration,
    RegisterRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let registerRequestDto: RegisterRequestDto; // (optional)

const { status, data } = await apiInstance.apiAuthRegisterPost(
    registerRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **registerRequestDto** | **RegisterRequestDto**|  | |


### Return type

**UserBaseModelBaseCommandResult**

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

# **apiAuthResetPasswordPost**
> StringBaseCommandResult apiAuthResetPasswordPost()


### Example

```typescript
import {
    AuthApi,
    Configuration,
    ResetPasswordRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let resetPasswordRequestDto: ResetPasswordRequestDto; // (optional)

const { status, data } = await apiInstance.apiAuthResetPasswordPost(
    resetPasswordRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **resetPasswordRequestDto** | **ResetPasswordRequestDto**|  | |


### Return type

**StringBaseCommandResult**

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

