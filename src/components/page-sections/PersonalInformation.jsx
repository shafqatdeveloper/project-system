import { useEffect, useState } from "react";
import AddressModalInput from "../inputs/AddressModalInput";
import DateWriteInput from "../inputs/DateWriteInput";
import DropdownInput from "../inputs/DropdownInput";
import NormalInput from "../inputs/NormalInput";
import { currencyLists } from "../../dummyData";
import CurrencySelect from "../inputs/CurrencySelect";
import LanguageSelectInput from "../inputs/LanguageSelectInput";
import PhoneInput from "../inputs/PhoneInput";

const PersonalInformation = ({
  personalinformation,
  setPersonalInformation,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState(
    personalinformation?.industry || "Select Industry"
  );
  useEffect(() => {
    setSelectedIndustry(personalinformation?.industry || "Select Industry");
  }, [personalinformation?.industry]);

  return (
    <>
      <div className="rounded-div mb-3">
        <NormalInput
          value={personalinformation?.legalFullName}
          placeholder={"Legal Full Name"}
          className={"bg-transparent br-0 "}
          setValue={(v) => {
            setPersonalInformation((prev) => ({ ...prev, legalFullName: v }));
          }}
        />
        <NormalInput
          placeholder={"ID Number  ( Passport / Driver's License  )"}
          className={"bg-transparent br-0 "}
          value={personalinformation?.idNumber}
          setValue={(v) => {
            setPersonalInformation((prev) => ({
              ...prev,
              idNumber: v,
            }));
          }}
        />
      </div>
      <div className="rounded-div mb-3">
        <DateWriteInput
          label={"Date of Birth"}
          value={personalinformation?.dob}
          setValue={(v) =>
            setPersonalInformation((prev) => ({ ...prev, dob: v }))
          }
        />
        <NormalInput
          placeholder={"Job Title"}
          className={"bg-transparent br-0 "}
          value={personalinformation?.jobTitle}
          inputClassName="placeholder-white"
          setValue={(v) => {
            setPersonalInformation((prev) => ({
              ...prev,
              jobTitle: v,
            }));
          }}
        />
        <DropdownInput
          placeholder={"Industry"}
          menuDirection={"bottom"}
          setValue={(v) => {
            setPersonalInformation((prev) => ({ ...prev, industry: v }));
            setSelectedIndustry(v);
          }}
          value={selectedIndustry}
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
          value={personalinformation?.address}
          setValue={(add) =>
            setPersonalInformation((prev) => ({ ...prev, address: add }))
          }
          label={"Address"}
        />
        <PhoneInput
          setValue={(v) =>
            setPersonalInformation((prev) => ({ ...prev, phone: v }))
          }
          value={personalinformation?.phone}
          placeholder={"Phone"}
        />
      </div>
      <div className="rounded-div">
        <CurrencySelect
          value={personalinformation?.currency}
          setValue={(v) =>
            setPersonalInformation((prev) => ({ ...prev, currency: v }))
          }
          placeholder={"Currency"}
        />

        <LanguageSelectInput
          value={personalinformation?.language}
          placeholder={"Language"}
          setValue={(v) =>
            setPersonalInformation((prev) => ({ ...prev, language: v }))
          }
        />
      </div>
    </>
  );
};

export default PersonalInformation;
