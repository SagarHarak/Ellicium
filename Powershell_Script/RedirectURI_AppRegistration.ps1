# Set the variables
$redirectUrl = "https://google.com"
$appRegistrationName = "eluse2client"

# Get the app registration
$appRegistration = Get-AzADApplication -DisplayName $appRegistrationName

# Check if the redirect URL exists
if ($appRegistration.Web.RedirectUri -contains $redirectUrl) {
    Write-Host "Redirect URL already exists."
}
else {
    # Add the redirect URL to the app registration
    $appRegistration.Web.RedirectUri += $redirectUrl

    # Update the app registration
    Set-AzADApplication -ObjectId $appRegistration.Id -Web $appRegistration.Web

    Write-Host "Redirect URL added successfully."
    #$updatedAppRegistration.Web.RedirectUri
}
