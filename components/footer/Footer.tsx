import Container from "$store/components/ui/Container.tsx";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";

import Slider from "$store/components/ui/Slider.tsx";
import type { ComponentChildren } from "preact";
import SectionItem, { isIcon } from "./SectionItem.tsx";
import type { Image } from "deco-sites/std/components/types.ts";

export type IconItem = {
  icon: AvailableIcons;
  href?: string;
  accessibleName: string;
};
export type ImageItem = {
  path: Image;
  alt: string;
  width?: number;
  height?: number;
  href?: string;
};
export type StringItem = {
  icon?: AvailableIcons;
  iconPosition?: "left" | "right";
  label: string;
  href: string;
};

export type Item = StringItem | IconItem | ImageItem;

export type Section = {
  label: string;
  children: Item[];
};

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`py-6 px-4 sm:py-12 sm:px-0 ${_class}`}>{children}</div>;
}

export interface Props {
  primarySections?: Section[];
  secondarySections?: Section[];
  specialistPhone: string;
  disclaimerText: string;
}

function Footer(
  {
    primarySections = [],
    secondarySections = [],
    specialistPhone,
    disclaimerText,
  }: Props,
) {
  return (
    <footer class="w-full bg-white flex flex-col">
      <div class="bg-header w-full mb-7">
        <Container>
          <Slider
            class="gap-6 col-span-full row-start-2 row-end-5 text-white md:justify-around"
            snap="snap-center sm:snap-start block first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0"
          >
            <a
              href="/"
              aria-label="Consulte Frete Grátis"
              class="flex items-center gap-3 py-7 md:justify-center"
            >
              <Icon id="Truck" strokeWidth={1} width={30} height={30} />
              <div>
                <p class="uppercase whitespace-nowrap font-semibold text-base">
                  Frete Grátis
                </p>
                <p class="text-sm whitespace-nowrap font-extralight">
                  Consulte*
                </p>
              </div>
            </a>
            <a
              href="/"
              aria-label="Compre no site e retire na loja"
              class="flex items-center gap-3 py-7 md:justify-center"
            >
              <Icon id="MapPin" strokeWidth={1} width={30} height={30} />
              <div>
                <p class="uppercase whitespace-nowrap font-semibold text-base">
                  Compra no site
                </p>
                <p class="text-sm whitespace-nowrap font-extralight">
                  E retire na loja*
                </p>
              </div>
            </a>
            <div
              aria-label="Em até 12 vezes no cartão de crédito*"
              class="flex items-center gap-3 py-7 md:justify-center"
            >
              <Icon id="CreditCard" strokeWidth={1} width={30} height={30} />
              <div>
                <p class="uppercase whitespace-nowrap font-semibold text-base">
                  Em até 12X
                </p>
                <p class="text-sm whitespace-nowrap font-extralight">
                  No cartão de crédito*
                </p>
              </div>
            </div>
            <a
              href="/"
              aria-label="Compre no site e retire na loja"
              class="flex items-center gap-3 py-7 md:justify-center"
            >
              <Icon id="ShieldCheck" strokeWidth={1} width={30} height={30} />
              <div>
                <p class="uppercase whitespace-nowrap font-semibold text-base">
                  Garantia
                </p>
                <p class="text-sm whitespace-nowrap font-extralight">
                  Veja as condições
                </p>
              </div>
            </a>
          </Slider>
        </Container>
      </div>

      <Container class="md:(w-full flex justify-start gap-[10rem] mb-8)">
        {specialistPhone
          ? (
            <div class="mb-2 md:self-center whitespace-nowrap">
              <p class="text-sm font-medium text-center mb-2">
                Fale com o Consultor Especializado
              </p>
              <a
                href="https://bit.ly/faleconsultor-ibyte"
                class="font-heading-2 text-heading-2 gap-2 flex justify-center items-center"
              >
                <Icon
                  id="WhatsApp"
                  width={26}
                  height={26}
                  class="text-[#56b231]"
                />
                <span>{specialistPhone}</span>
              </a>
            </div>
          )
          : null}
        {/* Desktop view */}
        <ul class="hidden sm:flex flex-row md:self-start gap-[10rem]">
          {primarySections.map((section) => (
            <li>
              <div>
                <Text variant="heading-3" tone="default">
                  {section.label}
                </Text>

                <ul
                  class={`flex ${
                    isIcon(section.children[0]) ? "flex-row" : "flex-col"
                  } gap-2 pt-3`}
                >
                  {section.children.map((item) => (
                    <li>
                      <SectionItem item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        {/* Mobile view */}
        <ul class="flex flex-col sm:hidden sm:flex-row gap-4 pt-2">
          {primarySections.map((section) => (
            <li>
              <Text variant="body" tone="default">
                <Text variant="heading-3" class="text-default">
                  {section.label}
                </Text>
                <ul
                  class={`flex ${
                    isIcon(section.children[0]) ? "flex-row" : "flex-col"
                  } gap-2 pt-3`}
                >
                  {section.children.map((item) => (
                    <li>
                      <SectionItem item={item} />
                    </li>
                  ))}
                </ul>
              </Text>
            </li>
          ))}
        </ul>
      </Container>
      <div class="bg-gray-100">
        <Container class="w-full flex flex-col">
          <FooterContainer>
            {/* Desktop view */}
            <ul class="hidden sm:flex flex-row gap-20">
              {secondarySections.map((section) => (
                <li>
                  <div>
                    <p class="text-sm font-semibold">
                      {section.label}
                    </p>

                    <ul
                      class={`flex ${
                        isIcon(section.children[0]) ? "flex-row" : "flex-col"
                      } gap-2 pt-3`}
                    >
                      {section.children.map((item) => (
                        <li>
                          <SectionItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>

            {/* Mobile view */}
            <ul class="flex flex-col sm:hidden sm:flex-row gap-6">
              {secondarySections.map((section) => (
                <li>
                  <Text variant="body" tone="default">
                    <p class="text-sm font-semibold">
                      {section.label}
                    </p>
                    <ul
                      class={`flex ${
                        isIcon(section.children[0]) ? "flex-row" : "flex-col"
                      } gap-2 pt-3`}
                    >
                      {section.children.map((item) => (
                        <li>
                          <SectionItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </Text>
                </li>
              ))}
            </ul>
          </FooterContainer>
        </Container>

        {disclaimerText
          ? (
            <Container class="w-full pt-5 mb-2 px-4 text-sm border-t-1 border-gray-200 text-gray-600">
              {disclaimerText}
            </Container>
          )
          : null}

        <Container class="w-full ">
          <FooterContainer class="flex justify-center w-full">
            <Text
              class="flex items-center gap-1"
              variant="body"
              tone="default"
            >
              Powered by{" "}
              <a
                href="https://www.deco.cx"
                aria-label="powered by https://www.deco.cx"
              >
                <Icon id="Deco" height={20} width={60} strokeWidth={0.01} />
              </a>
            </Text>
          </FooterContainer>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
