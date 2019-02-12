export const TEST_ACTION = "TEST_ACTION";
export const SETTINGS_HANDLE_CHANGE = "SETTINGS_HANDLE_CHANGE";

export function testAction () {
    return {
        type:TEST_ACTION,
    }
}

export function settingsHandleChange(propertyName, event)
{
    let settingsData = [];

    settingsData[propertyName] = event.target.value;

    return {
        type: SETTINGS_HANDLE_CHANGE,
        payload: settingsData,
    }
}