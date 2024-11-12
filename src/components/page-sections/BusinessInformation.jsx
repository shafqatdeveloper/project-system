import AddressModalInput from "../inputs/AddressModalInput";
import CurrencySelect from "../inputs/CurrencySelect";
import DateWriteInput from "../inputs/DateWriteInput";
import DropdownInput from "../inputs/DropdownInput";
import LanguageSelectInput from "../inputs/LanguageSelectInput";
import NormalInput from "../inputs/NormalInput";
import PhoneInput from "../inputs/PhoneInput";

const BusinessInformation = ({
  businessInformation,
  setBusinessInformation,
}) => {
  return (
    <>
      <div className="rounded-div mb-3">
        <NormalInput
          label={"Legal Business Name"}
          style={{ borderRadius: 0 }}
          value={businessInformation?.name}
          setValue={(v) =>
            setBusinessInformation((prev) => ({ ...prev, name: v }))
          }
        />
        <NormalInput
          label={"ID Number  (Registration Number/TIN/EIN)"}
          value={businessInformation?.id}
          style={{ borderRadius: 0 }}
          setValue={(v) =>
            setBusinessInformation((prev) => ({ ...prev, id: v }))
          }
        />
      </div>
      <div className="rounded-div mb-3">
        <DateWriteInput
          label={"Start Date"}
          value={businessInformation?.startDate}
          setValue={(v) =>
            setBusinessInformation((prev) => ({ ...prev, startDate: v }))
          }
        />
        <NormalInput
          style={{ borderRadius: 0 }}
          value={businessInformation?.contactFullName}
          setValue={(v) =>
            setBusinessInformation((prev) => ({ ...prev, contactFullName: v }))
          }
          placeholder={"Contact Full Name"}
          className={"bg-transparent"}
        />
        <DropdownInput
          placeholder={"Industry"}
          menuDirection={"right"}
          searchAble={true}
          options={[
            "Industry-1",
            "Industry-2",
            "Industry-3",
            "Industry-4",
            "Industry-5",
          ]}
        />
        <AddressModalInput
          value={businessInformation?.address}
          setValue={(add) =>
            setBusinessInformation((prev) => ({ ...prev, address: add }))
          }
          label={"Address"}
        />
        <PhoneInput
          setValue={(v) =>
            setBusinessInformation((prev) => ({ ...prev, phoneNumber: v }))
          }
          value={businessInformation?.phoneNumber}
          placeholder={"Phone"}
        />
      </div>

      <div className="rounded-div">
        <CurrencySelect
          value={businessInformation?.currency}
          setValue={(v) =>
            setBusinessInformation((prev) => ({ ...prev, currency: v }))
          }
          placeholder={"Currency"}
        />

        <LanguageSelectInput
          value={businessInformation?.language}
          placeholder={"Language"}
          setValue={(v) =>
            setBusinessInformation((prev) => ({ ...prev, language: v }))
          }
        />
      </div>
    </>
  );
};

export default BusinessInformation;
