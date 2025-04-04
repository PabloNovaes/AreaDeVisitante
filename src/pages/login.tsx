import robot_logo from "@/../public/ico.svg";
import logo from "@/../public/letter-logo.svg";
import lgpd from "@/assets/LGPD.png";

import { Copyright, Envelope, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { LoginForm } from "../components/features/login-form";

import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

export function Login() {
  return (
    <main>
      <div className='grid-cols-1 h-svh relative flex flex-col justify-start lg:grid lg:max-w-none lg:grid-cols-3 lg:px-0'>
        <div className='col-span-2 bg-muted relative h-full flex-col p-10 text-white hidden lg:flex border-r'>
          <div className="absolute z-[1] inset-0 [background:url('https://novo.convitelivo.com.br/assets/bg-mobile-1nd9Mw97.svg')_center_top/cover]" />
          <div className="absolute z-[2] left-0 bottom-0 h-full w-full bg-gradient-to-t from-background to-[#5c307e]/30"></div>
          <div className='relative z-20 flex items-center text-lg font-medium'>
            <img src={logo} alt="letter-logo" className="h-5 opacity-55" />
          </div>
          <div className='relative z-20 mt-auto hidden lg:grid'>
            <blockquote className='space-y-2'>
              <p className='text-lg max-w-[900px]'>
                &ldquo;Já nos chamaram de Super App. Até mesmo ganhamos o título de Condotech. Para o íntimos 'Livinho'. Nossa missão é conectar o seu condomínio.&rdquo;
              </p>
              <footer className='text-sm'>Livo App</footer>
            </blockquote>
          </div>
        </div>
        <div className='flex h-full justify-center px-6 relative'>
          <LoginForm />
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, filter: "brightness(.7)" }}
              animate={{
                opacity: [0, 6, 0.8],
                filter: "blur(100px)",
              }}
              transition={{ duration: 0.5 }}
              className="bg-cover absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/10 rounded-full blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, filter: "brightness(.7)" }}
              animate={{
                opacity: [0, 6, 0.8],
                filter: "blur(100px)",
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-cover absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/20 to-violet-500/10 rounded-full blur-3xl"
            />
            {/* <img src={outline_logo} className="absolute w-[300px] top-[10%] -right-1/3 z-20" /> */}
          </div>
        </div>

      </div>
      <footer
        id="footer"
        className={cn("no-print border-t text-primary bg-[#121212]")}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3 lg:grid-cols-5 sm:text-left">
            <div className="space-y-3">
              <div className="font-regular flex flex-col items-center sm:items-start gap-2">
                <img
                  src={robot_logo}
                  alt="logo"
                  className="w-fit h-15 relative object-contain"
                />
                <h2 className="font-bold text-md">Livo App</h2>
              </div>
              <p className="text-sm text-primary/60">Modulos que conectam</p>
            </div>
            <div className="space-y-3 flex flex-col">
              <h2 className="text-sm font-semibold">Contato</h2>
              <ul className="flex justify-center sm:justify-start space-x-2 text-sm">
                <li>
                  <button
                    className="size-11 grid place-content-center rounded-full border bg-[#181818] border-zinc-700 text-primary/60 hover:bg-[#46c254] hover:text-white transition-all duration-300"
                  >
                    <Link
                      to={`https://api.whatsapp.com/send/?phone=5511940437904&text=Ol%C3%A1%2C+gostaria+de+conhecer+melhor+a+plataforma+Livo&type=phone_number&app_absent=0`}
                      target="_blank"
                    >
                      <WhatsappLogo weight="duotone" size={24} />
                    </Link>
                  </button>
                </li>
                <li>
                  <button
                    className="size-11 grid place-content-center rounded-full border bg-[#181818] border-zinc-700 text-primary/60 hover:bg-gradient-to-b from-[#833ab4] via-[#fd1d1d]/90 to-[#fcb045] hover:text-white transition-all duration-300"
                  >
                    <Link
                      to="https://www.instagram.com/livoapp/"
                      target="_blank"
                    >
                      <InstagramLogo weight="duotone" size={24} />
                    </Link>
                  </button>
                </li>
                <li>
                  <button
                    className="size-11 grid place-content-center rounded-full border bg-[#181818] border-zinc-700 text-primary/60 hover:bg-[#e34134] hover:text-white transition-all duration-300"
                  >
                    <Link to="mailto:contato@livoapp.com.br" target="_blank">
                      <Envelope weight="duotone" size={24} />
                    </Link>
                  </button>
                </li>
              </ul>
            </div>
            <div className="space-y-3 flex flex-col">
              <h2 className="text-sm font-semibold">Informações legais</h2>
              <ul className="space-y-2 text-sm">
                {/* <li>
                  <Link to="/termos-de-uso" target="_top" className="text-primary/60 hover:text-white transition-colors duration-200">
                    Termos de uso
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/politica-de-privacidade"
                    target="_top"
                    className="text-primary/60 hover:text-white transition-colors duration-200"
                  >
                    Politica de privacidade
                  </Link>
                </li>
                <li className="flex justify-center sm:justify-start">
                  <div className=" rounded-xl px-1 w-28 ">
                    <img src={lgpd} />
                  </div>
                </li>
              </ul>
            </div>

          </div>
          <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-primary/60">
            <div className="flex items-center gap-2 justify-center sm:justify-start w-full sm:w-auto whitespace-nowrap">
              <Copyright size={16} />
              <span>{new Date().getFullYear()} Livo App</span>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-x-4 gap-y-2 text-center w-full sm:w-auto">
              <span>CNPJ: 40.008.355/0001-41</span>
              <span className="hidden sm:inline">|</span>
              <span>LIVO TECNOLOGIA DA INFORMACAO LTDA</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}